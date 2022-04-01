<?php

namespace App\Controller\Admin;

use App\Entity\Measure;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class ChartsController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    #[Route('/admin/charts', name: 'app_admin_charts')]
    
    public function sendWaterConsumption (): Response
    {
        $measureObjects = $this->doctrine->getRepository(Measure::class)->findBy(array('measureType' => '2'));
        $measureCoordinate = array();
        
        foreach($measureObjects as $measureObject){
            array_push($measureCoordinate, array("idMeasure" => $measureObject->getId(),
                                                 "valMeasure" => $measureObject->getValue()
            ));
        }
        dump($measureCoordinate);
        return new JsonResponse($measureCoordinate);
    }   
}