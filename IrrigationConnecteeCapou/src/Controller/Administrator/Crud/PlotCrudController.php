<?php

/*============================================================================
    Name        : PlotCrudController.php
    Path	    : src/Controller/Administrator/Crud
    Author      : BTS SNIR, Lycée Antoine Bourdelle
    Description : Plot's actions control
    Date 	    : 2022
 ============================================================================*/

namespace App\Controller\Administrator\Crud;

use App\Entity\Plot;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PlotCrudController extends AbstractCrudController
{
    public const PLOT_UPLOAD_DIR = 'public/documents/plots';

    public static function getEntityFqcn(): string
    {
        return Plot::class;
    }
    
    public function configureCrud(Crud $crud): Crud
    {
        return $crud->setEntityLabelInPlural('Parcelles')
                    ->setEntityLabelInSingular('Parcelle')
                    ->setPageTitle('index', 'Liste des %entity_label_plural%')
                    ->setPageTitle('edit', fn (Plot $plot) => sprintf('Éditer "%s"', $plot->getName()))
                    ->setPageTitle('new', 'Ajouter une %entity_label_singular%');
    }
        
    public function configureFields(string $pageName): iterable
    {
            yield TextField::new('name', 'Nom')
                ->setHelp('Nom de reconnaissance de la parcelle');
            yield AssociationField::new('user', 'Technicien en charge')
                ->setRequired(true)
                ->setTemplatePath('roles/administrator/_elements/_plotForm.html.twig')
                ->setHelp('Technicien(s) en charge de la parcelle')
                ->formatValue(function ($value, $entity) {
                    $str = $entity->getUser()[0];
                    for ($i = 1; $i < $entity->getUser()->count(); $i++) {
                        $str = $str . ", " . $entity->getUser()[$i];
                    }
                    return $str;
                });
//             FormField::addPanel('User Details'),
            yield ImageField::new('filepath')
                ->setUploadDir(self::PLOT_UPLOAD_DIR)
                ->setFormTypeOption('mapped', false)
                ->onlyOnForms()
                ->setUploadedFileNamePattern('[day]-[month]-[year].json');
            yield NumberField::new('area', 'Surface');         
    }
    
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if(!$entityInstance instanceof Plot) return;

//         $entityInstance->setFilepath('documents/plots/'.$entityInstance->getName().'.json');
//         dump($entityInstance->getFilepath());
//         die();
//         $entityInstance->setPlainPassword($entityInstance->getPassword());
//         $password = $this->encoder->hashPassword($entityInstance, $entityInstance->getPassword());
//         $entityInstance->setPassword($password);
        
//         $email = $this->mailerController->emailRegistration($entityInstance);
//         $loader = new FilesystemLoader('C:\Users\sarah\git\Capou\IrrigationConnecteeCapou\templates');
//         $twig = new Environment($loader);
        
//         $renderer = new BodyRenderer($twig);
//         $renderer->render($email);
//         $this->mailerController->emailSend($email);
        
//         $entityManager->persist($entityInstance);
//         $entityManager->flush();
    }    
}