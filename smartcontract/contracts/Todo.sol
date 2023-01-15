// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Todo {

    struct Task{
        uint id;
        string taskText;
        bool isDeleted;
    }

    Task[] private task;

    mapping (uint256 => address) taskToOwner;

    event AddTask(address recipient, uint taskId);
    event DeleteTask(uint taskId, bool isDeleted);

    function addTask(string memory _taskText, bool _isDeleted) external {
        uint taskId = task.length;
        task.push(Task(taskId, _taskText, _isDeleted));
        taskToOwner[taskId] = msg.sender;
        emit AddTask(msg.sender, taskId);
    }
    
    // Get tasks that are mine and not deleted
    function getMyTasks() external view returns (Task [] memory){
        Task[] memory temporary = new Task[](task.length);
        uint counter = 0;

        for(uint i=0; i<task.length; i++){
            if(taskToOwner[i] == msg.sender && task[i].isDeleted == false){
                temporary[counter] = task[i];                                 // Another method of Pushing to array
                counter++;
            }
        }
        Task[] memory result = new Task[](counter);
        for (uint i=0; i < counter; i++){
            result[i] = temporary[i];
        }
        return result;
    }

    // Delete tasks
    function deleteTask(uint taskId, bool isDeleted) external {
        if(taskToOwner[taskId] ==msg.sender){
            task[taskId].isDeleted = isDeleted;
            emit DeleteTask(taskId, true);
        }
    }  
}