class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "0", Date.now(), "Genesis Block", this.calculateHash(0, "0", Date.now(), "Genesis Block"));
    }

    calculateHash(index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const latestBlock = this.getLatestBlock();
        const newIndex = latestBlock.index + 1;
        const newTimestamp = Date.now();
        const newHash = this.calculateHash(newIndex, latestBlock.hash, newTimestamp, data);
        const newBlock = new Block(newIndex, latestBlock.hash, newTimestamp, data, newHash);
        this.chain.push(newBlock);
    }

    displayChain() {
        const blockchainList = document.getElementById('blockchain-list');
        blockchainList.innerHTML = '';
        this.chain.forEach(block => {
            const blockElement = document.createElement('li');
            blockElement.textContent = `Block ${block.index}: ${block.data} (Hash: ${block.hash})`;
            blockchainList.appendChild(blockElement);
        });
    }
}

// Initialize Blockchain
const blockchain = new Blockchain();

// Add Block Event Listener
document.getElementById('add-block').addEventListener('click', () => {
    const data = document.getElementById('data').value;
    if (data) {
        blockchain.addBlock(data);
        document.getElementById('data').value = '';
        alert('Data successfully added in Blockchain');
    } else {
        alert('Please enter some data');
    }
});

// View Blockchain Event Listener
document.getElementById('view-blockchain').addEventListener('click', () => {
    blockchain.displayChain();
});
