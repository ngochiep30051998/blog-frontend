# Admin CMS Frontend

Trang quản trị nội dung được xây dựng với React, TypeScript, Tailwind CSS và Ant Design.

## 🏗️ Cấu trúc dự án

```
src/
├── components/          # Các component tái sử dụng
│   ├── Sidebar/        # Menu điều hướng
│   ├── Header/         # Top navigation bar
│   ├── Breadcrumb/     # Đường dẫn trang
│   ├── PageHeader/     # Header cho mỗi trang
│   ├── Card/           # Card component
│   ├── Loading/        # Loading spinner
│   └── EmptyState/     # Empty state component
│
├── layouts/            # Layout components
│   ├── MasterLayout/   # Layout chính cho admin
│   └── AuthLayout/     # Layout cho trang đăng nhập
│
├── pages/              # Các trang
│   ├── home/          # Dashboard
│   ├── posts/         # Quản lý bài viết
│   └── auth/          # Authentication pages
│
├── guards/             # Route guards
├── routing/            # Cấu hình routing
└── services/           # API services
```

## 🎨 Components

### Layout Components

#### MasterLayout
Layout chính cho trang admin với:
- Sidebar responsive (desktop + mobile)
- Header với search, notifications, user menu
- Breadcrumb navigation
- Content area
- Footer

### Reusable Components

#### Sidebar
- Menu điều hướng với icons
- Hỗ trợ sub-menu
- User info section
- Responsive mobile menu

#### Header
- Search bar
- Notification dropdown
- User menu dropdown
- Mobile menu toggle

#### Breadcrumb
- Tự động tạo breadcrumb từ route
- Tích hợp với React Router

#### PageHeader
- Title và description
- Action buttons
- Responsive layout

#### Card
- Wrapper cho Ant Design Card
- Shadow effects
- Customizable

#### Loading
- Loading spinner component

#### EmptyState
- Empty state với action button
- Customizable message

## 📝 Sử dụng

### Tạo trang mới

1. Tạo thư mục mới trong `src/pages/`:
```tsx
// src/pages/categories/pages/Categories.tsx
import PageHeader from '../../../components/PageHeader';
import Card from '../../../components/Card';

const Categories = () => {
  return (
    <div>
      <PageHeader 
        title="Danh mục" 
        description="Quản lý danh mục bài viết"
      />
      <Card>
        {/* Nội dung */}
      </Card>
    </div>
  );
};

export default Categories;
```

2. Tạo router file:
```tsx
// src/pages/categories/index.tsx
import { RouteObject } from 'react-router';
import Categories from './pages/Categories';
import { IMenuItem } from '@blog-frontend/shared';

export const Router: RouteObject = {
  path: '/categories',
  element: <Categories />,
};

export const MenuItems: IMenuItem[] = [];
```

3. Thêm vào routing:
```tsx
// src/routing/index.tsx
import * as Categories from '../pages/categories';

const modules = [
    Home,
    Posts,
    Categories  // Thêm module mới
]
```

### Customize Sidebar Menu

Chỉnh sửa `src/components/Sidebar/Sidebar.tsx`:

```tsx
const menuItems: MenuItem[] = [
  getItem('Dashboard', '/home', <HomeOutlined />),
  getItem('Bài viết', '/posts', <FileTextOutlined />),
  getItem('Danh mục', '/categories', <TagsOutlined />),
  // Thêm menu items mới...
];
```

### Sử dụng Components

```tsx
import { PageHeader, Card, Loading, EmptyState } from '../../components';

// Page Header với action buttons
<PageHeader
  title="Tiêu đề"
  description="Mô tả"
  extra={
    <Button type="primary" icon={<PlusOutlined />}>
      Thêm mới
    </Button>
  }
/>

// Card
<Card title="Card title" extra={<Button>Action</Button>}>
  Nội dung
</Card>

// Loading
{isLoading && <Loading />}

// Empty State
<EmptyState
  title="Không có dữ liệu"
  description="Chưa có dữ liệu để hiển thị"
  actionText="Thêm mới"
  onAction={() => console.log('Add new')}
/>
```

## 🎯 Best Practices

### 1. Component Structure
- Một component một file
- Export cả named và default export
- Sử dụng TypeScript interfaces

### 2. Styling
- Ưu tiên Tailwind CSS utilities
- Sử dụng Ant Design components cho UI phức tạp
- Responsive design first

### 3. State Management
- Local state với useState cho UI state
- Props drilling tối đa 2-3 levels
- Consider Context API hoặc Zustand cho global state

### 4. Code Organization
- Nhóm files theo feature
- Shared components trong `src/components`
- Page-specific components trong page folder

### 5. Performance
- Lazy load routes khi cần
- Memoize expensive computations
- Optimize re-renders với React.memo

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

## 📦 Dependencies

- React 18
- TypeScript
- Tailwind CSS
- Ant Design
- React Router
- Vite

## 🎨 Design System

### Colors
- Primary: Blue (#1890ff)
- Success: Green (#52c41a)
- Warning: Orange (#faad14)
- Error: Red (#ff4d4f)

### Spacing
- Following Tailwind's spacing scale
- Consistent gap-4 (1rem) between elements
- Padding: p-4, p-6 for containers

### Typography
- Font: System font stack
- Headings: font-bold, text-2xl/xl/lg
- Body: text-sm/base

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## 📱 Responsive Design

- Mobile first approach
- Sidebar collapsible on mobile
- Table horizontal scroll on mobile
- Responsive grid layouts with Ant Design Grid

## ✅ Features

- ✅ Responsive admin layout
- ✅ Sidebar navigation with nested routes
- ✅ Header with search, notifications, user menu
- ✅ Breadcrumb navigation
- ✅ Dashboard with statistics
- ✅ Posts management with table
- ✅ Reusable components
- ✅ TypeScript support
- ✅ Tailwind CSS + Ant Design integration

## 🔜 TODO

- [ ] Add more pages (Categories, Comments, Users, Settings)
- [ ] Integrate with backend API
- [ ] Add authentication
- [ ] Add form validation
- [ ] Add data fetching with React Query
- [ ] Add state management (Zustand/Redux)
- [ ] Add tests
- [ ] Add dark mode
- [ ] Add internationalization (i18n)
