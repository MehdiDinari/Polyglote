from django.urls import path
from .views import CourseCreateView, CourseListView, CourseDetailView, CourseUpdateView, CourseDeleteView, CourseReserveView, CourseCancelReservationView

urlpatterns = [
    path('create/', CourseCreateView.as_view(), name='course-create'),
    path('list/', CourseListView.as_view(), name='course-list'),
    path('detail/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('update/<int:pk>/', CourseUpdateView.as_view(), name='course-update'),
    path('delete/<int:pk>/', CourseDeleteView.as_view(), name='course-delete'),
    path('reserve/<int:pk>/', CourseReserveView.as_view(), name='course-reserve'),
    path('cancel-reservation/<int:pk>/', CourseCancelReservationView.as_view(), name='course-cancel-reservation'),
]
