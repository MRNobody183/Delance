//SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
contract JobPosting {
    uint256 count = 1;
    uint256 applicantId = 1;

    using ECDSA for bytes32;

    enum Status{
        incomplete,
        complete,
        pending
    }

    string signature='6e3303ecd362e2543e19337befddb76ecc20eacba5e61960d315789058cbf52d';

    struct jobDetails {
        address ownerAddress;
        string ownerName;
        string title;
        string description;
        uint256 deadline;
        uint256 price;
        address[] proposals;
        address hiredFreelancer;
        string submitProject;
        Status status;
    }

    struct applicantDetails {
        string applicantName;
        string applicantEmail;
    }

    mapping(uint256 => jobDetails)  jobs;
    mapping(uint256 => applicantDetails) public applicants;

    constructor () payable{}


    function addJob(string memory _ownerName,string memory _title,string memory _description,uint256 _deadline,uint256 _price) public payable {
        require(msg.value >= _price,"insufficient amount to post a job");
    
        jobs[count] = jobDetails({ownerAddress:msg.sender,ownerName:_ownerName,title:_title,description:_description,deadline:_deadline,price:_price,proposals:new address[](0),hiredFreelancer:address(0),submitProject:"",status:Status.incomplete});
        
        count++;
    }

    function applicantData(string memory _applicantName,string memory _applicantEmail) public {
        applicants[applicantId] = applicantDetails(_applicantName,_applicantEmail);
        applicantId++;
    }

    function applyForJob(uint256 _id) external {
        require(msg.sender!=jobs[_id].ownerAddress,"Owner cant apply");
        require(jobs[_id].hiredFreelancer==address(0x0),"hired freelancer already");
        jobs[_id].proposals.push(msg.sender);
    }

    function getJobDetails(uint256 _id) external view returns(jobDetails memory){
        return jobs[_id];
    }

    function getAllJobs() external view returns(jobDetails[] memory){
        uint256 jobsCounter = count;

        jobDetails[] memory allJobs = new jobDetails[](jobsCounter);
        for(uint256 i=1;i<jobsCounter;i++){
            allJobs[i] = jobs[i]; 
        }
        return allJobs;
    }

    function hireFreelancer(uint _jobId,address _address) external{
        require(msg.sender==jobs[_jobId].ownerAddress,"only owner can hire");
        require(_address!=jobs[_jobId].ownerAddress,"owner cant hire himself");
        jobs[_jobId].hiredFreelancer=_address;
    } 

    function submitProject(string memory _projectUrl,uint _id) external{
        require(msg.sender==jobs[_id].hiredFreelancer,"you are not hired for this job");
        require(msg.sender!=jobs[_id].ownerAddress,"Yoou are the owner of this");
        jobs[_id].submitProject=_projectUrl;
    }

    function getSubmission(uint _id) external view returns(string memory){
        require(msg.sender==jobs[_id].ownerAddress,"Owner can only view submission");
        return jobs[_id].submitProject;
    }

    function setStatus(uint _statusId,uint _id) external{
        require(msg.sender==jobs[_id].ownerAddress,"You are not the owner of this project");
        require(_statusId<3,"You can only give 3 choices ");
        if(_statusId==0)
        {
            jobs[_id].status=Status.incomplete;
        }
         if(_statusId==1)
        {
            jobs[_id].status=Status.pending;
        }
         if(_statusId==2)
        {
            jobs[_id].status=Status.complete;
            address payer= jobs[_id].hiredFreelancer;
        (bool sent,)=( payer).call{value:jobs[_id].price}("");
        require(sent,"failed");
        }
       
    } 
     function getProjectStatus(uint _id) external view returns (Status){
        require(msg.sender==jobs[_id].hiredFreelancer,"you are not hired for this job");
        require(msg.sender!=jobs[_id].ownerAddress,"Yoou are the owner of this");
        require(jobs[_id].status==Status.complete,"Money is transfered to your account");
        return jobs[_id].status;
    }
    function getSignature(bytes memory _signature,uint256 _jobId)public view returns(address){
       
       
        bytes32 _hash=keccak256(
                abi.encodePacked(jobs[_jobId].ownerAddress,jobs[_jobId].hiredFreelancer)
            );
        address recoveredSign= ECDSA.recover(ECDSA.toEthSignedMessageHash(_hash), _signature);
        return recoveredSign;
    }
}
