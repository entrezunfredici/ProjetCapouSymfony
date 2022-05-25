<?php

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
        return $this->render('historical_data/index.html.twig');
    }
}
