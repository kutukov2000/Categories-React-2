import { useEffect, useState } from "react";
import { ICategory } from "./types";
import { Col, Row } from "antd";
import http_common from "../../http_common";
import CategoryCard from "./CategoryCard";

const CategoryListPage = () => {

    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        http_common.get<ICategory[]>("/api/categories")
            .then(response => setCategories(response.data));
    }, [])

    const handleDelete = async (id: number) => {
        try {
            await http_common.delete(`/api/categories/${id}`);
            setCategories(categories.filter(x => x.id != id));
        }
        catch (error) {
            console.log("Error delete", error);
        }
    }

    return (
        <>
            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {categories.length === 0 ? (
                            <h2>Categories list is empty</h2>
                        ) : (
                            categories.map((item) =>
                                <CategoryCard key={item.id} item={item} handleDelete={handleDelete} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default CategoryListPage;