<?php

/*============================================================================
    Name        : MapController.php
    Path	    : src/Controller/Technician
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Technician's map control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Technician;

use App\Entity\Measure;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/technician')]
class MapController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    
    #[Route('/map', name: 'app_technician_map')]
    public function sendLocation(ManagerRegistry $doctrine, EntityManagerInterface $entityManager): Response
    {
        $this->doctrine = $doctrine;
        
        $measureObjects = $this->doctrine->getRepository(Measure::class)->findAll();
        $measureCoordinate = array();
        
        foreach($measureObjects as $measureObject){
            $coordinate = $this->DSMToDD($measureObject->getGps());
            array_push($measureCoordinate, array("idMeasure" => $measureObject->getId(),
                                                 "latitude" => $coordinate["latitude"],
                                                 "longitude" => $coordinate["longitude"]
            ));
        }
        return new JsonResponse($measureCoordinate);
    }
    
    /* *********************************************** Get Coordinate **************************************************** */
    private function DSMToDD($frameArray): array
    {
        $nmeaFrame = explode(",", $frameArray);
        
        $frameLatitude = floatval($nmeaFrame[0]);
        $frameLongitude = floatval($nmeaFrame[1]);
        
        return array("longitude" => $frameLongitude, "latitude" => $frameLatitude);
    }
    /* ******************************************************************************************************************* */
}
