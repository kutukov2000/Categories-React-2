import { Button } from "antd";
import { Link } from "react-router-dom";

const CategoryListPage = () => {
    
    
    return (
        <>
            <h1>Categories List</h1>

            <Link to={"category/create"}>
                <Button type="primary" size="large">
                    Add
                </Button>
            </Link>
        </>
    );
}

export default CategoryListPage;