API:http://127.0.0.1:8000/admin/courses/getAll
method:GET
Cấu trúc data Json bên BE trả ra
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Lập trình Python cơ bản",
      "description": "Khóa học nhập môn Python",
      "instructor": "Tran Thi B",
      "avavatarInstructor": "http://127.0.0.1:8000/images/users/avatar_demo.png",
      "lectures": 6,
      "students": 0,
      "rating": 4.66666666666667,
      "reviews": 3,
      "price": 400000,
      "originalPrice": 500000,
      "image": "http://127.0.0.1:8000/images/courses/17646426822051.png",
      "duration": 10
    },
    {
      "id": "2",
      "name": "Khóa học Laravel căn bản",
      "description": "Học cách xây dựng ứng dụng web với Laravel.",
      "instructor": "Nguyen Van A",
      "avavatarInstructor": "http://127.0.0.1:8000/images/users/avatar_demo.png",
      "lectures": 0,
      "students": 0,
      "rating": 5,
      "reviews": 2,
      "price": 169150,
      "originalPrice": 199000,
      "image": "http://127.0.0.1:8000/images/courses/course_img_demo.png",
      "duration": 10
    },
    {
      "id": "3",
      "name": "Khóa học Laravel căn bản test v1",
      "description": "Học cách xây dựng ứng dụng web với Laravel. v1",
      "instructor": "Nguyen Van A",
      "avavatarInstructor": "http://127.0.0.1:8000/images/users/avatar_demo.png",
      "lectures": 0,
      "students": 0,
      "rating": 0,
      "reviews": 0,
      "price": 169150,
      "originalPrice": 199000,
      "image": "http://127.0.0.1:8000/images/courses/course_img_demo.png",
      "duration": 30
    },
    {
      "id": "4",
      "name": "Khóa học PHP nâng cao",
      "description": "Học nâng cao về PHP và MySQL",
      "instructor": "Le Van C",
      "avavatarInstructor": "http://127.0.0.1:8000/images/users/avatar_demo.png",
      "lectures": 0,
      "students": 0,
      "rating": 0,
      "reviews": 0,
      "price": 720000,
      "originalPrice": 800000,
      "image": "http://127.0.0.1:8000/images/courses/course_img_demo.png",
      "duration": 40
    }
  ],
  "error": null,
  "meta": null
}