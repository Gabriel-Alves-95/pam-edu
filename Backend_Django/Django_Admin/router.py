from rest_framework import routers
from Django_App.viewsets import UserViewset, ProfileViewset, TeacherViewset, AdultInChargeViewset, StudentViewset, CourseViewset, EnrollmentViewset

router = routers.DefaultRouter()
router.register('users', UserViewset)
router.register('profiles', ProfileViewset)
router.register('teachers', TeacherViewset)
router.register('adults', AdultInChargeViewset)
router.register('students', StudentViewset)
router.register('courses', CourseViewset)
router.register('enrollments', EnrollmentViewset)