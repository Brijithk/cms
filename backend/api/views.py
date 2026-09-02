# from django.shortcuts import render
# from django.http import JsonResponse
from doctor.models import Consultation,PrescribedLab,Doctor
from receptionist.models import Patient ,Appointment
from .serializers import LabTestSerializer,MedicineSerializer,AppointmentSerializer,ConsultationSerializer,UserSerializer,PrescribedLabSerializer,PatientSerializer, StaffSerializer,DoctorSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from administrator.models import User,Staff,Medicine,LabTest
from django.http import Http404
from rest_framework import mixins,generics
from doctor.models import Consultation
from rest_framework import viewsets
# Create your views here.

@api_view(['GET','POST'])
def cmsView(request):
    if request.method=='GET':
        consultation=Consultation.objects.all()
        serializer=ConsultationSerializer(consultation,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    elif request.method=='POST':
        serializer=ConsultationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
def consultationDetailView(request,pk):
    try:
        consultation=Consultation.objects.get(pk=pk)
    except Consultation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer= ConsultationSerializer(consultation)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer =ConsultationSerializer(consultation,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method=='DELETE':
        consultation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#administrator

class UserView(APIView):
    def get(self,request):
        user = User.objects.all()
        serializer =  UserSerializer(user,many=True)   
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    def get_object(self,pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self,request,pk):
        user = self.get_object(pk)
        serializer=UserSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request,pk):
        user = self.get_object(pk)
        serializer=UserSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        user=self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StaffListCreateView(generics.ListCreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class StaffDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class PrescribedLabView(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset=PrescribedLab.objects.all()
    serializer_class = PrescribedLabSerializer

    def get(self,request):
        return self.list(request)

    def post(self,request):
        return self.create(request)

class PrescribedLabDetailView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView
       ):
    queryset = PrescribedLab.objects.all()
    serializer_class = PrescribedLabSerializer

    def get(self, request, pk):
        return self.retrieve(request, pk)

    def patch(self, request, pk):
        return self.partial_update(request, pk)

#receptionist
class PatientListCreateView(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DoctorListCreateView(generics.ListCreateAPIView):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer


class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Doctor.objects.all()

    serializer_class = DoctorSerializer

class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        # Check Doctor
        try:
            doctor = Doctor.objects.get(username=username)

            if doctor.password == password:

                return Response({
                    "id": doctor.id,
                    "name": doctor.name,
                    "role": "doctor",
                    "doctor_id": doctor.doctor_id
                })

        except Doctor.DoesNotExist:
            pass


        # Check Staff
        try:
            staff = Staff.objects.get(username=username)

            if staff.password == password:

                return Response({
                    "id": staff.id,
                    "name": staff.name,
                    "role": staff.department.lower(),
                    "staff_id": staff.staff_id
                })

        except Staff.DoesNotExist:
            pass


        return Response(
            {"message": "Invalid username or password"},
            status=401
        )

class AppointmentListCreateView(generics.ListCreateAPIView):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer


class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer

class MedicineListCreateView(generics.ListCreateAPIView):
    queryset = Medicine.objects.all().order_by("-id")
    serializer_class = MedicineSerializer


class MedicineDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    lookup_field = "medicine_id"

class LabTestListCreateView(generics.ListCreateAPIView):
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer


class LabTestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LabTest.objects.all()
    serializer_class = LabTestSerializer
    lookup_field = "pk"

class ConsultationViewSet(viewsets.ModelViewSet):

    queryset = Consultation.objects.all().order_by("-consultation_id")
    serializer_class = ConsultationSerializer

    def get_queryset(self):

        queryset = Consultation.objects.all().order_by(
            "-consultation_id"
        )

        appointment_id = self.request.query_params.get(
            "appointment"
        )

        if appointment_id:
            queryset = queryset.filter(
                appointment=appointment_id
            )

        return queryset
    def create(self, request, *args, **kwargs):

        print("CONSULTATION REQUEST DATA:")
        print(request.data)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            consultation = serializer.save()

            # Get appointment ID from consultation
            appointment_id = consultation.appointment

            try:
                appointment = Appointment.objects.get(
                    appointment_id=appointment_id
                )

                appointment.status = "Consulted"
                appointment.save(update_fields=["status"])

                print(
                    f"Appointment {appointment_id} status updated to Consulted"
                )

            except Appointment.DoesNotExist:

                print(
                    f"Appointment {appointment_id} not found"
                )

            response_serializer = self.get_serializer(
                consultation
            )

            return Response(
                response_serializer.data,
                status=status.HTTP_201_CREATED
            )

        print("CONSULTATION VALIDATION ERROR:")
        print(serializer.errors)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # def create(self, request, *args, **kwargs):

    #     print("CONSULTATION REQUEST DATA:")
    #     print(request.data)

    #     serializer = self.get_serializer(
    #         data=request.data
    #     )

    #     if serializer.is_valid():

    #         consultation = serializer.save()

    #         response_serializer = self.get_serializer(
    #             consultation
    #         )

    #         return Response(
    #             response_serializer.data,
    #             status=status.HTTP_201_CREATED
    #         )

    #     print("CONSULTATION VALIDATION ERROR:")
    #     print(serializer.errors)

    #     return Response(
    #         serializer.errors,
    #         status=status.HTTP_400_BAD_REQUEST
    #     )
