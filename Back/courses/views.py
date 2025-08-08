from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer

# Vues de création, listage, mise à jour, suppression des cours
class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseUpdateView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseDeleteView(generics.DestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

# Vues pour la gestion des réservations
class CourseReserveView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        course = self.get_object()
        if course.reserve_slot():  # Remplacer par la logique de réservation
            return Response({'message': 'Réservation réussie!'}, status=200)
        return Response({'message': 'Aucune place disponible.'}, status=400)

class CourseCancelReservationView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        course = self.get_object()
        if course.cancel_reservation():  # Remplacer par la logique d'annulation
            return Response({'message': 'Réservation annulée!'}, status=200)
        return Response({'message': 'Aucune réservation à annuler.'}, status=400)
