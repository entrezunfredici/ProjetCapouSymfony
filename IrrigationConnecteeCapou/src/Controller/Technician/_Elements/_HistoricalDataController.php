<?php

/*============================================================================
    Name        : _HistoricalDataController.php
    Path	    : src/Controller/Technician/_Elements
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Historical data display
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Technician\_Elements;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/technician/data')]
class _HistoricalDataController extends AbstractController
{
    #[Route('/historical', name: 'app_technician_data_historical')]
    public function index(): Response
    {
        $firstName=$this->getUser()->getFirstName();
        $lastName=$this->getUser()->getLastName();
        return $this->render('historical_data/index.html.twig', ['firstname'=>$firstName, 'lastname'=>$lastName]);
    }
}
