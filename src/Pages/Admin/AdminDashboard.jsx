function AdminDashboard(){
    return(
        <div>
            <h1>Dashboard</h1>
            <h1>{localStorage.getItem('username')}</h1>
        </div>
    );
}

export default AdminDashboard