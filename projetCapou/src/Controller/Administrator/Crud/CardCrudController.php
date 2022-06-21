<?php

namespace App\Controller\Administrator\Crud;

use App\Entity\Card;
use App\Entity\Plot;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;

class CardCrudController extends AbstractCrudController
{
    private LoggerInterface $logger;
    private $doctrine;
    
    public function __construct(LoggerInterface $logger, ManagerRegistry $doctrine)
    {
        $this->logger = $logger;
        $this->doctrine = $doctrine;
    }
    
    public static function getEntityFqcn(): string
    {
        return Card::class;
    }
    
    public function configureCrud(Crud $crud): Crud
    {
        return $crud->setPageTitle('index', 'Liste des piquets')
                    ->setPageTitle('edit', fn (Card $card) => sprintf('Éditer "%s"', $card->getLora()))
                    ->setPageTitle('new', 'Ajouter un piquet')
                    ->setPageTitle('detail', fn (Card $card) => sprintf('Détails piquet %s', $card->getLora()))
                    ->showEntityActionsInlined();
    }
    
    public function configureActions(Actions $actions): Actions
    {
        return $actions->add(Crud::PAGE_INDEX, Action::DETAIL)
                       ->remove(Crud::PAGE_INDEX, Action::DELETE)
                       ->remove(Crud::PAGE_DETAIL, Action::DELETE);
    }

    public function configureFields(string $pageName): iterable
    {
        $function = [
            'Vanne'=>'Vanne',
            'Relais'=>'Relais'
        ];
        
        yield TextField::new('lora', 'Identifiant Lora');
        yield DateTimeField::new('date', 'Date de mise en service')
            ->setFormat('dd/MM/yyyy HH:mm');
        yield TextField::new('location', 'Localisation')
            ->setLabel('longitude, latitude');
        yield ChoiceField::new('function', 'Fonction')
            ->setChoices($function)
            ->renderExpanded();
        yield AssociationField::new ('state', 'État du piquet')
            ->setRequired(true);
    }
    
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if(!$entityInstance instanceof Card) return;
        
        $plotObjects = $this->doctrine->getRepository(Plot::class)->findAll();
        $plotFiles = array();
        
        foreach($plotObjects as $plotObject){
            array_push($plotFiles, array("idPlot" => $plotObject->getId(), "filepathPlot" => $plotObject->getFilepath()));
        }  
        
//         dump($plotFiles[0]["filepathPlot"]);
//         die();
//         $plotObjects = $this->doctrine->getRepository(Plot::class)->findAll();
//         $plotFiles = array();
        
//         foreach($plotObjects as $plotObject){
//             //array_push($plotFiles, array("idPlot" => $plotObject->getId(), "filepathPlot" => $plotObject->getFilepath()));
//             $data = file_get_contents($plotObject->getFilepath());
//             json_decode($data);
//             dump($data);
//             die();
//         }
//         $cardCoordinate = $this->DSMToDD($entityInstance->getLocation());
//         dump($cardCoordinate["latitude"]);
//         die();
        
        $entityManager->persist($entityInstance);
        $entityManager->flush();
        
        $this->logger->info("Un administrateur vient d'ajouter un nouveau piquet ");
    }
    
    public function updateEntity($entityManager, $entityInstance):void
    {
        if(!$entityInstance instanceof Card) return;
        
        $this->logger->info("Un administrateur vient de modifier un piquet ");
        $entityManager->persist($entityInstance);
        $entityManager->flush();
    }
    
//     public function deleteEntity($entityManager, $entityInstance):void
//     {
//         if(!$entityInstance instanceof Card) return;
        
//         if($entityInstance->getPlotId()){
//             $entityInstance->setPlotId(null);
//         }
        
//         $this->logger->info("Un administrateur vient de supprimer un piquet ");
//         $entityManager->remove($entityInstance);
//         $entityManager->flush();
//     }
    
    /* *********************************************** Get Coordinate **************************************************** */
    private function DSMToDD($frameArray): array
    {
        $nmeaFrame = explode(",", $frameArray);
        
        $frameLatitude = floatval($nmeaFrame[0]);
        $frameLongitude = floatval($nmeaFrame[1]);
        
        return array("longitude" => $frameLongitude, "latitude" => $frameLatitude);
    }
    
    private function getPlotCoordinates(): Response
    {        
             
        return new JsonResponse($plotFiles);
    }
    /* ******************************************************************************************************************* */
}
