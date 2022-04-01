<?php

namespace App\Controller;
use App\Entity\Measure;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class MapController extends AbstractController
{
    private $doctrine;
    
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    #[Route('/technician/map', name: 'mapLastData')]
    public function sendLocation(ManagerRegistry $doctrine, EntityManagerInterface $entityManager): Response
    {
        
        $this->doctrine = $doctrine;
        
        //         $repository = $entityManager->getRepository(Measure::class);
        //         $measures = $repository->findAll();
        //         dd($measures);
        
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
