from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ConsultationViewSet


router = DefaultRouter()

router.register(
    r"consultations",
    ConsultationViewSet,
    basename="consultation"
)

urlpatterns=[
    path("", include(router.urls)),

    #doctor
    path('cms/',views.cmsView),
    path('cms/<int:pk>/',views.consultationDetailView),
    path('PrescribedLab/',views.PrescribedLabView.as_view()),
    path('PrescribedLabDetailView/<int:pk>/',views.PrescribedLabDetailView.as_view()),
      
    
    #administrator
    path('user/',views.UserView.as_view()),
    path('user/<int:pk>/',views.UserDetail.as_view()),
    path("staff/",views.StaffListCreateView.as_view()),
    path("staff/<int:pk>/",views.StaffDetailView.as_view()),
    path("doctors/",views.DoctorListCreateView.as_view()),
    path("doctors/<int:pk>/",views.DoctorDetailView.as_view()),
   path(
    "medicines/",
    views.MedicineListCreateView.as_view(),
    name="medicine-list-create"
),

path(
    "medicines/<str:medicine_id>/",
    views.MedicineDetailView.as_view(),
    name="medicine-detail"
),
     path("lab-tests/", views.LabTestListCreateView.as_view()),
     path("lab-tests/<int:pk>/", views.LabTestDetailView.as_view()),

    #receptionist
    path("patients/",views.PatientListCreateView.as_view()),
    path("patients/<int:pk>/",views.PatientDetailView.as_view()),
    path("appointments/",views.AppointmentListCreateView.as_view()),
    path("appointments/<int:pk>/",views.AppointmentDetailView.as_view()),

    #other
    path("login/", views.LoginView.as_view()),
]