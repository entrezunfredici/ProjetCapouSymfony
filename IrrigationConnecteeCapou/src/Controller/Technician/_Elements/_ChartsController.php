<?php

/*============================================================================
    Name        : ChartsController.php
    Path	    : src/Controller/Technician
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Technician's charts control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Technician\_Elements;

use App\Entity\Measure;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/technician')]
class _ChartsController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    
    #[Route('/charts', name: 'app_technician_charts')]
    public function sendMesures(): Response
    {
        $measureObjects = $this->doctrine->getRepository(Measure::class)->findAll();
        $measureCoordinate = array();
        
        foreach($measureObjects as $measureObject){
            array_push($measureCoordinate, array("idMeasure" => $measureObject->getId(),
                                                 "valMeasure" => $measureObject->getValue()
            ));
        }
        return new JsonResponse($measureCoordinate);
    }
}
