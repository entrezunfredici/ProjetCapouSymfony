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
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
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
        return $crud->setPageTitle('index', 'Liste des parcelles')
                    ->setPageTitle('edit', fn (Plot $plot) => sprintf('Éditer "%s"', $plot->getName()))
                    ->setPageTitle('new', 'Ajouter une parcelle')
                    ->setPageTitle('detail', fn (Plot $plot) => sprintf('Détails %s', $plot->getName()))
                    ->showEntityActionsInlined();
    }
    
    public function configureActions(Actions $actions): Actions
    {
        return $actions->add(Crud::PAGE_INDEX, Action::DETAIL);
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
            yield ImageField::new('filepath', 'Chemin fichier')
                ->setUploadDir(self::PLOT_UPLOAD_DIR)
                ->onlyOnForms()
                //->setUploadedFileNamePattern(fn (UploadedFile $file): string => sprintf('%s',$file->getClientOriginalName()));
                ->setUploadedFileNamePattern('documents/plots/[name].json');
            yield NumberField::new('area', 'Surface');
    }  
}