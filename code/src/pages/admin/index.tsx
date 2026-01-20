import { Link } from "react-router"

const AdminHome = () => {
    return (
        <>
            <h1> AdminHome </h1>
            < Link to={'/admin/artists'} > Artistes </Link>
        </>

    )
}

export default AdminHome