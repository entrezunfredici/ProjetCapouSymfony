<?php

/*============================================================================
    Name        : TechnicianController.php
    Path	    : src/Controller/Technician
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Technician's interface control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Technician;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TechnicianController extends AbstractController
{
    #[Route('/technician', name: 'app_technician')]
    public function index(): Response
    {
        return $this->render('roles/technician/index.html.twig');
    }
}
?>