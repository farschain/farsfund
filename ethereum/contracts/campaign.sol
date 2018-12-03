pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum, string campaignTitle, string imageHash) public{
        address newCampaign = new Campaign(minimum, msg.sender, campaignTitle, imageHash);
        
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }
    
}

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public minimumContribution;
    string[] public ipfsImageHash;
    mapping(address => bool) public approvers;
    uint public approversCount; 
    Request[] public requests;
    string public title;
     
    modifier restricted(){
        require(msg.sender == manager, "access denied");
        _;
    }
    
    constructor(uint minimum, address creator, string campaignTitle, string imageHash) public {
        //manager = msg.sender; campaign contarct address
        manager = creator;
        title = campaignTitle;
        minimumContribution = minimum;
        ipfsImageHash.push(imageHash); 
    }

    function contribute() public payable {
        require(!approvers[msg.sender], "address already founded this campain.");
        require(msg.value > minimumContribution, "minimum contribution error");
         
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request( {
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount:0
        });
        
        requests.push(newRequest);

    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender], "address is not on valid list");
        require(!request.approvals[msg.sender], "address already approved request");
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        
    }
    
    
    function finalizedRequest(uint index) public restricted{
        Request storage request = requests[index];
        
        require(!request.complete, "no active request on index");
        require((request.approvalCount > (approversCount / 2)), "not enougth votes for finalized");
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }

    function getSummery() public view returns (
        uint, uint, uint, uint, address, string, string   
    ) {
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager,
            title,
            ipfsImageHash[0]
        );
    }

    function getApprovals(uint index, address approver) public view returns(bool) {
        Request storage request = requests[index];
        
        return request.approvals[approver];
    }

    function getRequestsCount() public view returns(uint) {
        return requests.length;
    }
}