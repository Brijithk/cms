from rest_framework import serializers
from doctor.models import Consultation,PrescribedLab,Doctor
from administrator.models import UserProfile,Staff,Medicine,LabTest
from receptionist.models import Patient,Appointment
from doctor.models import ( Consultation, PrescribedLab, PrescribedMedicine )
# class ConsultationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Consultation
#         fields="__all__"

# class PrescribedLabSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=PrescribedLab
#         fields="__all__"

#administrator
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields="__all__"

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"
class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = "__all__"

#receptionist
class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = "__all__"

# class AppointmentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Appointment
#         fields = "__all__"

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = "__all__"

        read_only_fields = [
            "appointment_id",
            "token_no",
            "status",
            "created_at",
            "updated_at",
        ]

class MedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicine
        fields = [
            "medicine_id",
            "medicine_name",
            "medicine_type",
            "manufacturer_name",
            "manufacture_date",
            "expiry_date",
            "price_per_unit",
            "stock_quantity",
            "quantity",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "medicine_id",
            "quantity",
            "created_at",
            "updated_at",
        ]

class LabTestSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabTest
        fields = [
            "test_id",
            "test_name",
            "normal_range",
            "sample_required",
            "unit",
            "department",
            "tat",
            "price",
            "description",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "test_id",
            "created_at",
            "updated_at",
        ]

class PrescribedMedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = PrescribedMedicine

        fields = [
            "prescription_id",
            "medicine_id",
            "medicine_name",
            "dosage",
            "morning",
            "afternoon",
            "night",
            "food_timing",
            "duration",
        ]

        read_only_fields = [
            "prescription_id",
            "medicine_name",
        ]
# class PrescribedMedicineSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = PrescribedMedicine
#         fields = [
#             "prescription_id",
#             "consultation_id",
#             "medicine_id",
#             "medicine_name",
#             "dosage",
#             "morning",
#             "afternoon",
#             "night",
#             "food_timing",
#             "duration",
#         ]

#         read_only_fields = [
#             "prescription_id",
#             "consultation_id",
#         ]

# class PrescribedLabSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = PrescribedLab

#         fields = [
#             "lab_prescription_id",
#             "test_id",
#             "test_name",
#         ]

#         read_only_fields = [
#             "lab_prescription_id",
#             "test_name",
#         ]

# class PrescribedLabSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = PrescribedLab
#         fields = [
#             "lab_prescription_id",
#             "consultation_id",
#             "test_id",
#             "test_name",
#             "status",
#         ]

#         read_only_fields = [
#             "lab_prescription_id",
#             "consultation_id",
#         ]

class PrescribedLabSerializer(serializers.ModelSerializer):

    patient_id = serializers.IntegerField(
        source="consultation.patient_id",
        read_only=True
    )

    doctor_id = serializers.CharField(
        source="consultation.doctor_id",
        read_only=True
    )

    report_date = serializers.DateField(
    source="consultation.consultation_date",
    read_only=True
     )  

    class Meta:
        model = PrescribedLab

        fields = [
            "lab_prescription_id",
            "test_id",
            "test_name",
            "status",
            "patient_id",
            "doctor_id",
            "results",
            "technician_notes",
            "report_date",
        ]
class ConsultationSerializer(serializers.ModelSerializer):

    prescribed_medicines = PrescribedMedicineSerializer(
        many=True,
        required=False
    )

    prescribed_tests = PrescribedLabSerializer(
        many=True,
        required=False
    )

    class Meta:
        model = Consultation

        fields = [
            "consultation_id",
            "appointment",
            "patient_id",
            "doctor_id",
            "symptoms",
            "diagnosis",
            "doctor_notes",
            "medical_advice",
            "consultation_date",
            "follow_up_date",
            "notes",
            "prescribed_medicines",
            "prescribed_tests",
        ]

        read_only_fields = [
            "consultation_id"
        ]

    def create(self, validated_data):

        medicines_data = validated_data.pop(
            "prescribed_medicines",
            []
        )

        tests_data = validated_data.pop(
            "prescribed_tests",
            []
        )

        consultation = Consultation.objects.create(
            **validated_data
        )

        # Save medicines
        for medicine_data in medicines_data:

            PrescribedMedicine.objects.create(
                consultation=consultation,
                **medicine_data
            )

        # Save lab tests
        for test_data in tests_data:

            test = LabTest.objects.get(
                test_id=test_data["test_id"]
            )

            PrescribedLab.objects.create(
                consultation=consultation,
                test_id=test.test_id,
                test_name=test.test_name
            )

        return consultation
    # class ConsultationSerializer(serializers.ModelSerializer):

    #     prescribed_medicines = PrescribedMedicineSerializer(
    #         many=True,
    #         required=False
    #     )

    #     prescribed_tests = PrescribedLabSerializer(
    #         many=True,
    #         required=False
    #     )

    #     class Meta:
    #         model = Consultation
    #         fields = [
    #             "consultation_id",
    #             "appointment",
    #             "patient_id",
    #             "doctor_id",
    #             "symptoms",
    #             "diagnosis",
    #             "doctor_notes",
    #             "medical_advice",
    #             "consultation_date",
    #             "follow_up_date",
    #             "notes",
    #             "prescribed_medicines",
    #             "prescribed_tests",
    #         ]

    #         read_only_fields = [
    #             "consultation_id"
    #         ]

    #     def create(self, validated_data):

    #         medicines_data = validated_data.pop(
    #             "prescribed_medicines",
    #             []
    #         )

    #         tests_data = validated_data.pop(
    #             "prescribed_tests",
    #             []
    #         )

    #         consultation = Consultation.objects.create(
    #             **validated_data
    #         )

    #         # Create medicines
    #         for medicine_data in medicines_data:

    #             PrescribedMedicine.objects.create(
    #                 consultation_id=consultation.consultation_id,
    #                 **medicine_data
    #             )

    #         # Create tests
    #         for test_data in tests_data:

    #             PrescribedLab.objects.create(
    #                 consultation_id=consultation.consultation_id,
    #                 **test_data
    #             )

    #         return consultation

