<?php

namespace App\Controller\Technician;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TechnicianController extends AbstractController
{
    #[Route('/technician', name: 'app_technician')]
    public function index(): Response
    {
        return $this->render('technician/index.html.twig');
    }
}

$temperature=25;//il faudra recuperer la rai valeur sur la BDD
$humidity=50;//il faudra recuperer la rai valeur sur la BDD
?>
<script>
    var Temperature=<?php echo $temperature; ?>;
    var Humidity=<?php echo $humidity; ?>;
    document.getElementById("TemperatureValue").innerHTML=Temperature;
    document.getElementById("HumidityValue").innerHTML=Humidity;
</script>