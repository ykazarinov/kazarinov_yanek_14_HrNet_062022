import Select from "../../components/Select/select"
import Calendar from "../../components/Calendar/calendar"

const selectList = ['Choose item...', 'item 1', 'item 2', 'item 3']

export default function Home(){
    return <main className="container">
        <div className="row">
            <div className="col-12">
                <h1>Create Employee</h1>
            </div>
        </div>
        <form className="row">
            <div className="col-6">
                <label htmlFor='firstName'>First Name</label>
                <input id="firstName" />
            </div>
            <div className="col-6">
                <label htmlFor='lastName'>Last Name</label>
                <input id="lastName" />
            </div>

            <div className="address col-6">
                    <label htmlFor="birthday">Date of Birth</label>
                    <Calendar  id='birthday' ></Calendar>
            </div>
            <div className="address col-6">
                    <label htmlFor="startday">Start Date</label>
                    <Calendar data={selectList} id='startday' selectNumber='2'></Calendar>
            </div>

            <div className="address col-6">
                    <label htmlFor="state">State</label>
                    <Select data={selectList} id='state' selectNumber='1'></Select>
            </div>
            <div className="address col-6">
                    <label htmlFor="state2">State2</label>
                    <Select data={selectList} id='state2' selectNumber='2'></Select>
            </div>
            <button>test</button>
        </form>
            
        </main>
}