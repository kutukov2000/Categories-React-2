import { Button, Table, message } from "antd";
import { Link } from "react-router-dom";
import { ICategory } from "./types";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../env";
import http_common from "../../http_common";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from '@ant-design/icons';

const CategoryListPage = () => {
    const [list, setList] = useState<ICategory[]>([]);

    const serverURL = APP_ENV.BASE_URL + "/uploading/150_";

    useEffect(() => {
        http_common.get("/api/categories")
            .then(resp => {
                setList(resp.data);
            });
    }, []);

    const deleteCategory = async (id: number) => {
        try {
            await http_common.delete(`/api/categories/${id}`);
        }
        catch (ex) {
            message.error('Category deleting error!');
            return;
        }

        setList(prevCategories => prevCategories.filter(category => category.id !== id));
    }

    const columns: ColumnsType<ICategory> = [
        {
            title: "#",
            dataIndex: 'id'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (imageName: string) => {
                return (
                    <img src={serverURL + imageName} alt="Category image" width={150} />
                );
            }
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            render: (id) => {
                return (
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <Button type="primary"
                            icon={<DeleteOutlined />}
                            size="large"
                            style={{ backgroundColor: '#8c1c1c' }}
                            onClick={() => { deleteCategory(id) }} />
                    </div>
                );
            }
        }
    ];

    return (
        <>
            <h1>Categories List</h1>
            <Table dataSource={list} columns={columns} rowKey="id" />
            <Link to={"category/create"}>
                <Button type="primary" size="large">
                    Add
                </Button>
            </Link>
        </>
    );
}

export default CategoryListPage;