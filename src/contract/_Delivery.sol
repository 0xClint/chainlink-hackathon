// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

struct Order {
    uint pid;
    uint quantity;
    address customer;
    bool reached;
    address deleveryAgent;
    bool delivered;
    uint otp;
}

contract Delivery is VRFConsumerBaseV2, ConfirmedOwner {
    mapping(uint256 => string) public pidToPname; //product Id to product name
    mapping(uint256 => address) public pidToSid; //product Id to seller's id
    mapping(uint256 => uint256) public pidToCarbon; //product Id to carbon footprint of the product
    mapping(uint256 => uint256) public pidToPrice; //product Id to price of the product
    mapping(uint => Order) public orderDetails;
    uint counter = 1;

    uint[] public orderQueue;

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/#configurations
    bytes32 keyHash =
        0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 2;

    constructor(
        uint64 subscriptionId,
        address seller1,
        address seller2
    )
        VRFConsumerBaseV2(0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed
        );
        s_subscriptionId = subscriptionId;

        pidToPname[79] = "CryptoBeast ASIC Miner";
        pidToPname[170] = "MegaHash Pro GPU Rig";
        pidToPname[364400] = "PowerMine 2000W Power Supply";
        pidToPname[277316] = "BlockMaster Cooling Solution";
        pidToPname[500000] = "HashForce Mining Motherboard";

        pidToSid[79] = seller1;
        pidToSid[170] = seller1;
        pidToSid[364400] = seller2;
        pidToSid[277316] = seller2;
        pidToSid[500000] = seller2;

        pidToCarbon[79] = 170;
        pidToCarbon[170] = 220;
        pidToCarbon[364400] = 250; //should get from an oracle
        pidToCarbon[277316] = 90;
        pidToCarbon[500000] = 270;

        pidToPrice[79] = 1000000000000000;
        pidToPrice[170] = 500000000000000;
        pidToPrice[364400] = 600000000000000;
        pidToPrice[277316] = 700000000000000;
        pidToPrice[500000] = 400000000000000;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords()
        internal
        onlyOwner
        returns (uint256 requestId)
    {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(
        uint256 _requestId
    ) internal view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    function placeOrder(
        uint256 _pid,
        uint256 _quantity
    ) public payable returns (uint) {
        uint256 tax = pidToCarbon[_pid]; /*(Some Calculations)*/
        uint256 totalPrice = (pidToPrice[_pid] + tax) * _quantity;

        require(
            msg.value == totalPrice,
            "Please pay the total price for the product!"
        );

        uint orderId = counter;
        counter = counter + 1;

        orderQueue.push(orderId);
        Order memory order;
        order.customer = msg.sender;
        order.pid = _pid;
        order.quantity = _quantity;
        order.reached = false;
        order.delivered = false;
        orderDetails[orderId] = order;

        return orderId;
    }

    function assignDeliverAgent(
        uint _orderId,
        address _deleveryAgent
    ) external {
        require(
            msg.sender == pidToSid[orderDetails[_orderId].pid],
            "Not Authorized Seller for the order!"
        );
        orderDetails[_orderId].deleveryAgent = _deleveryAgent;
    }

    function deleveryReached(uint _orderId) external {
        require(
            msg.sender == orderDetails[_orderId].deleveryAgent,
            "Not Authorized Delevery Agrnt for the order"
        );
        orderDetails[_orderId].reached = true;
    }

    function generateOTP(uint _orderId) external returns (uint) {
        require(
            orderDetails[_orderId].reached == true,
            "Please wait! Your orer is on its way."
        );
        require(
            msg.sender == orderDetails[_orderId].customer,
            "This it not your order, Please put you order ID"
        );
        uint reqId = requestRandomWords();
        return reqId;
    }

    function getMyOTP(
        uint _reqId,
        uint _orderId
    ) external returns (bool, uint) {
        require(
            orderDetails[_orderId].reached == true,
            "Please wait! Your order is on its way."
        );
        require(
            msg.sender == orderDetails[_orderId].customer,
            "This it not your order, Please put you order ID"
        );
        bool fulfilled;
        uint256[] memory randomWords;
        (fulfilled, randomWords) = getRequestStatus(_reqId);
        uint otp = randomWords[0] % 1000000;
        orderDetails[_orderId].otp = otp;
        return (fulfilled, otp);
    }

    function deliveryComplete(uint _orderId, uint _otp) external {
        require(
            msg.sender == orderDetails[_orderId].deleveryAgent,
            "Not Authorized Delevery Agrnt for the order"
        );
        require(
            _otp == orderDetails[_orderId].otp,
            "Invalid OTP! Please try again"
        );
        orderDetails[_orderId].delivered = true;
    }
}
