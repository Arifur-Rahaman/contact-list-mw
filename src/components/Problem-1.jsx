import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({
        name: '',
        status: '',
        id: ''
    })

    //***Create new task***/
    const handleFormSubmit = (e) => {
        setTasks(prev => ([...prev, { ...task, id: uuid() }]))
        setTask({ name: '', status: '', id: '' })
        e.preventDefault()
    }

    //***Handle new task input change ***/
    const handleInputChange = (e) => {
        setTask(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //***Sort task by status***/
    const sortByTaskStatus = (a, b) => {
        const sortingOrder = ['active', 'completed']
        const aIndex = sortingOrder.indexOf(a.status)
        const bIndex = sortingOrder.indexOf(b.status)
        if (aIndex === -1 && bIndex === -1) {
            return 0;
        }
        else if (aIndex === -1) {
            return 1
        }
        else if (bIndex === -1) {
            return -1
        }
        return (aIndex - bIndex)

    }

    //***Filter or sort decider***/
    const filterOrSortTask = () => {
        if (show === 'all') {
            const sortedTask = tasks.sort(sortByTaskStatus)
            return sortedTask
        } else {
            return tasks.filter((task) => task.status === show)
        }
    }

    const handleClick = (val) => {
        setShow(val);
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleFormSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input value={task.name} onChange={handleInputChange} name="name" type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input value={task.status} onChange={handleInputChange} name="status" type="text" className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterOrSortTask().map((task) => (
                                    <tr key={task.id}>
                                        <td>{task?.name}</td>
                                        <td>{task?.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;