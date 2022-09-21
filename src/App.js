import { useReducer } from 'react';
import './App.css';
//1.Init state
const initState = {
    job: '',
    jobs: [],
};

//2.Action
const SET_JOB = 'set_job';
const ADD_JOB = 'add_job';
const DELETE_JOB = 'delete_job';

const setJob = (payload) => {
    return {
        type: SET_JOB,
        payload: payload,
    };
};
const addJob = (payload) => {
    return {
        type: ADD_JOB,
        payload,
    };
};
const deleteJob = (payload) => {
    return {
        type: DELETE_JOB,
        payload,
    };
};

//3.Reducer
const reducer = (state, action) => {
    let newState = { ...state };
    switch (action.type) {
        case SET_JOB:
            newState = {
                ...state,
                job: action.payload,
            };

            return newState;
        case ADD_JOB:
            newState = {
                ...state,
                job: '',
                jobs: [...state.jobs, action.payload],
            };
            return newState;

        case DELETE_JOB:
            const newJobs = [...state.jobs];
            newJobs.splice(action.payload, 1);
            newState = {
                ...state,
                jobs: newJobs,
            };
            return newState;

        default:
            throw new Error('invalid');
    }
};
//4.Dispatch
function App() {
    const [state, dispatch] = useReducer(reducer, initState);
    const { job, jobs } = state;

    const handleSubmit = () => {
        dispatch(addJob(job));
    };

    return (
        <div className="app">
            <div className="app_body">
                <h1 className="app_body-tilte">Todo</h1>
                <div className="app_body-one">
                    <input
                        className="app_body-input"
                        value={job}
                        onChange={(e) => {
                            dispatch(setJob(e.target.value));
                        }}
                        placeholder="Enter todo.."
                    />
                    <button className="app_body-add" onClick={handleSubmit}>
                        Add
                    </button>
                </div>

                {jobs.map((job, index) => (
                    <ul className="app_body-list">
                        <li className="app_body-item" key={index}>
                            {job}
                            <button className="app_body-item-delete" onClick={() => dispatch(deleteJob(index))}>
                                Delete
                            </button>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
}
export default App;
