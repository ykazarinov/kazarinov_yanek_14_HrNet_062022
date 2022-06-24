import Select from "../../components/Select/select"

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
                <label htmlFor="state">State</label>
                <Select data={selectList} id='state'></Select>
            </div>
        </form>
            
        </main>
}