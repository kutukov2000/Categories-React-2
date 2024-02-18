import { Button, Form, Input, Row, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ICategoryCreate, IUploadedFile } from "./types";
import TextArea from "antd/es/input/TextArea";
import { UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import http_common from "../../http_common";

const CategoryCreatePage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm<ICategoryCreate>();

    const onHandleSubmit = async (values: ICategoryCreate) => {
        try {
            await http_common.post("/api/categories", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        }
        catch (ex) {
            console.log("Error", ex);
        }
    }

    return (
        <>
            <h1>Add Category</h1>
            <Row>
                <Form form={form}
                    onFinish={onHandleSubmit}
                    layout="vertical"
                    style={{
                        minWidth: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "20"
                    }}>

                    <Form.Item
                        label="Name"
                        name="name"
                        htmlFor="name"
                        rules={[
                            { required: true, message: "Name is required!" },
                            { min: 3, message: "Minimal length is 3" }
                        ]}>
                        <Input autoComplete="name" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        htmlFor="description"
                        rules={[
                            { required: true, message: "Description is required!" },
                            { min: 10, message: "Minimal length is 10" }
                        ]}>
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image"
                        valuePropName="image"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            const image = e?.fileList[0] as IUploadedFile;
                            return image?.originFileObj;
                        }}
                        rules={[{ required: true, message: 'Image is required!' }]}>
                        <Upload
                            showUploadList={{ showPreviewIcon: false }}
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}>
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ margin: 10 }} type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Link to={"/"}>
                            <Button style={{ margin: 10 }} htmlType="button">
                                Cancel
                            </Button>
                        </Link>
                    </Row>
                </Form>
            </Row>
        </>
    );
}

export default CategoryCreatePage;