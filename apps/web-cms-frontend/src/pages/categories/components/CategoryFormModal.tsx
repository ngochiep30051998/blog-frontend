import { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Switch,
  Select,
  ColorPicker,
  Upload,
  Button,
  InputNumber,
  message,
} from 'antd';
import { UploadOutlined, PictureOutlined } from '@ant-design/icons';
import { FileType, ICategory, ICreateCategoryDto } from '@blog-frontend/shared';
import categoryService from '../../../services/category.service';
import { uploadImage } from '@cms/services/api.service';

const { TextArea } = Input;

interface CategoryFormModalProps {
  visible: boolean;
  category?: ICategory | null;
  onClose: () => void;
  onSuccess: () => void;
}

// Font Awesome icons danh sách phổ biến
const ICON_OPTIONS = [
  { label: 'Laptop Code', value: 'fas fa-laptop-code' },
  { label: 'Mobile', value: 'fas fa-mobile-alt' },
  { label: 'Book', value: 'fas fa-book' },
  { label: 'Graduation Cap', value: 'fas fa-graduation-cap' },
  { label: 'Code', value: 'fas fa-code' },
  { label: 'Database', value: 'fas fa-database' },
  { label: 'Server', value: 'fas fa-server' },
  { label: 'Cloud', value: 'fas fa-cloud' },
  { label: 'Cog', value: 'fas fa-cog' },
  { label: 'Paint Brush', value: 'fas fa-paint-brush' },
  { label: 'Camera', value: 'fas fa-camera' },
  { label: 'Music', value: 'fas fa-music' },
  { label: 'Video', value: 'fas fa-video' },
  { label: 'Rocket', value: 'fas fa-rocket' },
  { label: 'Star', value: 'fas fa-star' },
  { label: 'Heart', value: 'fas fa-heart' },
  { label: 'Shopping Cart', value: 'fas fa-shopping-cart' },
  { label: 'Users', value: 'fas fa-users' },
  { label: 'Chart Line', value: 'fas fa-chart-line' },
  { label: 'Lightbulb', value: 'fas fa-lightbulb' },
];

export function CategoryFormModal({
  visible,
  category,
  onClose,
  onSuccess,
}: CategoryFormModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const isEditing = !!category;

  useEffect(() => {
    if (visible) {
      loadCategories();
      if (category) {
        form.setFieldsValue({
          name: category.name,
          description: category.description,
          parentId: category.parentId,
          color: category.color || '#3b82f6',
          icon: category.icon,
          metaTitle: category.metaTitle,
          metaDescription: category.metaDescription,
          sortOrder: category.sortOrder,
          isActive: category.isActive,
        });
        setImageUrl(category.coverImageUrl || '');
      } else {
        form.resetFields();
        form.setFieldsValue({
          isActive: true,
          sortOrder: 0,
          color: '#3b82f6',
        });
        setImageUrl('');
      }
    }
  }, [visible, category, form]);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await categoryService.getAll();
      if (response.data) {
        // Filter out current category if editing to prevent circular reference
        const filteredCategories = category
          ? response.data.filter((c) => c.id !== category.id)
          : response.data;
        setCategories(filteredCategories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const response = await uploadImage({
        file, type: FileType.THUMBNAIL,
      });
      if (response.data?.cloudinaryUrl) {
        setImageUrl(response.data.cloudinaryUrl);
        form.setFieldsValue({ coverImageUrl: response.data.cloudinaryUrl });
        message.success('Upload ảnh thành công!');
      }
    } catch (error: any) {
      message.error(error?.message || 'Upload ảnh thất bại!');
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ có thể upload file ảnh!');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Ảnh phải nhỏ hơn 5MB!');
      return false;
    }
    handleImageUpload(file);
    return false;
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const data: ICreateCategoryDto = {
        name: values.name,
        description: values.description,
        parentId: values.parentId || undefined,
        color: typeof values.color === 'string' ? values.color : values.color?.toHexString?.(),
        icon: values.icon,
        coverImageUrl: imageUrl || undefined,
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        sortOrder: values.sortOrder || 0,
        isActive: values.isActive !== undefined ? values.isActive : true,
      };

      if (isEditing) {
        await categoryService.update(category.id, data);
        message.success('Cập nhật danh mục thành công!');
      } else {
        await categoryService.create(data);
        message.success('Tạo danh mục thành công!');
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      message.error(error?.message || 'Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <PictureOutlined className="text-blue-600" />
          <span className="text-lg font-semibold">
            {isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <Form.Item
              label={<span className="font-medium">Tên danh mục</span>}
              name="name"
              rules={[
                { required: true, message: 'Vui lòng nhập tên danh mục!' },
                { min: 2, message: 'Tên phải có ít nhất 2 ký tự!' },
                { max: 100, message: 'Tên không được quá 100 ký tự!' },
              ]}
            >
              <Input size="large" placeholder="VD: Công nghệ" />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium">Mô tả</span>}
              name="description"
            >
              <TextArea
                rows={3}
                placeholder="Mô tả về danh mục..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium">Danh mục cha</span>}
              name="parentId"
            >
              <Select
                size="large"
                placeholder="Chọn danh mục cha (nếu có)"
                allowClear
                loading={loadingCategories}
                options={categories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label={<span className="font-medium">Màu sắc</span>}
                name="color"
              >
                <ColorPicker
                  size="large"
                  showText
                  format="hex"
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                label={<span className="font-medium">Icon</span>}
                name="icon"
              >
                <Select
                  size="large"
                  placeholder="Chọn icon"
                  showSearch
                  options={ICON_OPTIONS}
                  optionRender={(option) => (
                    <div className="flex items-center gap-2">
                      <i className={option.data.value} />
                      <span>{option.data.label}</span>
                    </div>
                  )}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label={<span className="font-medium">Thứ tự sắp xếp</span>}
                name="sortOrder"
              >
                <InputNumber
                  size="large"
                  min={0}
                  className="w-full"
                  placeholder="0"
                />
              </Form.Item>

              <Form.Item
                label={<span className="font-medium">Trạng thái</span>}
                name="isActive"
                valuePropName="checked"
              >
                <div className="flex items-center h-10">
                  <Switch checkedChildren="Hoạt động" unCheckedChildren="Tắt" />
                </div>
              </Form.Item>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <Form.Item
              label={<span className="font-medium">Ảnh bìa</span>}
              name="coverImageUrl"
            >
              <div className="space-y-3">
                {imageUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={imageUrl}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      danger
                      size="small"
                      onClick={() => {
                        setImageUrl('');
                        form.setFieldsValue({ coverImageUrl: '' });
                      }}
                      className="absolute top-2 right-2"
                    >
                      Xóa
                    </Button>
                  </div>
                )}
                <Upload
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                  accept="image/*"
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploading}
                    block
                    size="large"
                  >
                    {uploading ? 'Đang upload...' : 'Upload ảnh'}
                  </Button>
                </Upload>
                <p className="text-xs text-gray-500">
                  Định dạng: JPG, PNG, GIF. Tối đa 5MB
                </p>
              </div>
            </Form.Item>

            <Form.Item
              label={<span className="font-medium">Meta Title</span>}
              name="metaTitle"
            >
              <Input
                size="large"
                placeholder="Tiêu đề SEO"
                maxLength={60}
                showCount
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-medium">Meta Description</span>}
              name="metaDescription"
            >
              <TextArea
                rows={3}
                placeholder="Mô tả SEO"
                maxLength={160}
                showCount
              />
            </Form.Item>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button size="large" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            {isEditing ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default CategoryFormModal;
