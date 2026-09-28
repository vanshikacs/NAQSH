// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ProvenanceRegistry
 * @dev NAQSH - Heritage-tech authenticity and provenance registry for Lucknow chikankari.
 * 
 * CORE PRODUCT PHILOSOPHY:
 * "Don't verify the paperwork. Verify the object."
 * 
 * The blockchain does NOT "prove" a garment is handmade.
 * AI examines the physical craftsmanship (especially reverse-side stitch structure).
 * Physical seal binds the digital identity to the physical garment.
 * Ledger makes the resulting record tamper-evident.
 * 
 * ZERO PII ON-CHAIN:
 * - NO personal data
 * - NO photos or image binaries
 * - NO voice recordings
 * - NO GPS coordinates
 * - NO sensitive artisan information
 * Raw data remains off-chain. Only cryptographic hashes and identifiers are committed.
 */
contract ProvenanceRegistry {
    address public immutable owner;

    struct GarmentRecord {
        bytes32 recordHash;       // SHA256/Keccak hash of off-chain verification record
        bytes32 artisanHash;      // Obfuscated reference to registered artisan
        uint64 registeredAt;      // Block timestamp of registration
        bool isRevoked;           // Revocation flag for compromised seals/cloned QRs
        uint16 scanCount;         // Scan counter for anomaly detection
    }

    // Mapping from Garment ID string (e.g., "NQ-2026-001") to on-chain record
    mapping(string => GarmentRecord) private _records;

    // Events
    event GarmentRegistered(
        string indexed garmentId,
        bytes32 indexed recordHash,
        bytes32 indexed artisanHash,
        uint64 registeredAt
    );

    event GarmentFlagged(
        string indexed garmentId,
        string reason,
        uint64 flaggedAt
    );

    event GarmentScanLogged(
        string indexed garmentId,
        uint16 totalScans,
        uint64 scannedAt
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "NAQSH: caller is not the registry owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Registers a new verified garment on-chain
     * @param garmentId Standardized identifier (e.g. "NQ-2026-001")
     * @param recordHash Cryptographic digest of the AI visual assessment and audit report
     * @param artisanHash Cryptographic hash reference of artisan ID
     */
    function registerGarment(
        string calldata garmentId,
        bytes32 recordHash,
        bytes32 artisanHash
    ) external onlyOwner {
        require(_records[garmentId].registeredAt == 0, "NAQSH: Garment already registered");
        require(recordHash != bytes32(0), "NAQSH: Invalid record hash");

        uint64 timestamp = uint64(block.timestamp);

        _records[garmentId] = GarmentRecord({
            recordHash: recordHash,
            artisanHash: artisanHash,
            registeredAt: timestamp,
            isRevoked: false,
            scanCount: 1
        });

        emit GarmentRegistered(garmentId, recordHash, artisanHash, timestamp);
    }

    /**
     * @notice Increments the scan count for anti-cloning anomaly monitoring
     * @param garmentId Garment being scanned
     */
    function logScan(string calldata garmentId) external onlyOwner returns (uint16) {
        GarmentRecord storage record = _records[garmentId];
        require(record.registeredAt > 0, "NAQSH: Garment not registered");

        record.scanCount += 1;
        emit GarmentScanLogged(garmentId, record.scanCount, uint64(block.timestamp));

        return record.scanCount;
    }

    /**
     * @notice Flags a garment if suspicious QR reuse or seal tampering is confirmed
     * @param garmentId Garment to flag
     * @param reason Audit rationale
     */
    function flagDuplicate(string calldata garmentId, string calldata reason) external onlyOwner {
        GarmentRecord storage record = _records[garmentId];
        require(record.registeredAt > 0, "NAQSH: Garment not registered");

        record.isRevoked = true;
        emit GarmentFlagged(garmentId, reason, uint64(block.timestamp));
    }

    /**
     * @notice Retrieves verified record details for buyer verification
     */
    function getGarmentRecord(string calldata garmentId)
        external
        view
        returns (
            bytes32 recordHash,
            bytes32 artisanHash,
            uint64 registeredAt,
            bool isRevoked,
            uint16 scanCount
        )
    {
        GarmentRecord memory record = _records[garmentId];
        require(record.registeredAt > 0, "NAQSH: Garment record not found");

        return (
            record.recordHash,
            record.artisanHash,
            record.registeredAt,
            record.isRevoked,
            record.scanCount
        );
    }
}
