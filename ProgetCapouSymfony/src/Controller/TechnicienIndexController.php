<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TechnicienIndexController extends AbstractController
{
    #[Route('/technicien/index', name: 'app_technicien_index')]
    public function index(): Response
    {
        return $this->render('technicien_index/index.html.twig', [
            'controller_name' => 'TechnicienIndexController',
        ]);
    }
}
