<?php

/*============================================================================
    Name        : MapController.php
    Path	    : src/Controller/Administrator
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Administrator's map control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Administrator;

use App\Entity\Measure;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin')]
class MapController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    
    #[Route('/map', name: 'app_admin_map')]
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