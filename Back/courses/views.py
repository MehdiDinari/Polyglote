# Importation des classes nécessaires
from django.shortcuts import render
from django.views.generic import CreateView, ListView, UpdateView, DeleteView, DetailView
from .models import Course
from .forms import CourseForm  # Si tu utilises un formulaire personnalisé

# Vue pour créer un cours
class CourseCreateView(CreateView):
    model = Course
    template_name = 'courses/course_form.html'  # Assure-toi que ce template existe
    fields = ['title', 'description', 'reserved_slots']

# Vue pour afficher la liste des cours
class CourseListView(ListView):
    model = Course
    template_name = 'courses/course_list.html'  # Assure-toi que ce template existe
    context_object_name = 'courses'

# Vue pour afficher les détails d'un cours
class CourseDetailView(DetailView):
    model = Course
    template_name = 'courses/course_detail.html'  # Assure-toi que ce template existe

# Vue pour mettre à jour un cours
class CourseUpdateView(UpdateView):
    model = Course
    template_name = 'courses/course_form.html'
    fields = ['title', 'description', 'reserved_slots']

# Vue pour supprimer un cours
class CourseDeleteView(DeleteView):
    model = Course
    template_name = 'courses/course_confirm_delete.html'  # Assure-toi que ce template existe
    success_url = '/courses/'  # Redirige après la suppression
