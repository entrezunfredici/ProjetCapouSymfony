<?php

namespace App\Controller\Technician;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TechnicianController extends AbstractController
{
    #[Route('/technician', name: 'app_technician')]
    public function index(): Response
    {
        return $this->render('technician/index.html.twig');
    }
}
