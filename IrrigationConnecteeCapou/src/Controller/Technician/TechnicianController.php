<?php

namespace App\Controller\Technician;

use App\Entity\Measure;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class TechnicianController extends AbstractController
{
    private $doctrine;
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    #[Route('/technician', name: 'app_technician')]
    public function index(): Response
    {
        return $this->render('technician/index.html.twig');
    }
    #[Route('/technician/charts', name: 'app_technician_charts')]
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
?>