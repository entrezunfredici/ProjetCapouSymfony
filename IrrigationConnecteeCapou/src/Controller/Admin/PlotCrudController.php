<?php

namespace App\Controller\Admin;

use App\Entity\Plot;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ColorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;

class PlotCrudController extends AbstractCrudController
{
    
    public const PLOT_UPLOAD_DIR = 'public/upload/plots';
    
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
        return [
            TextField::new('name', 'Nom'),
            AssociationField::new('user', 'Technicien en charge')
                ->setRequired(true)
                ->setTemplatePath('admin/_elements/_plotForm.html.twig')
                ->setHelp('Technicien(s) en charge de la parcelle')
                ->formatValue(function ($value, $entity) {
                    $str = $entity->getUser()[0];
                    for ($i = 1; $i < $entity->getUser()->count(); $i++) {
                        $str = $str . ", " . $entity->getUser()[$i];
                    }
                    return $str;
                }),
            ImageField::new('filePath', 'Fichier')
                ->setUploadDir(self::PLOT_UPLOAD_DIR)->onlyOnForms(),
            NumberField::new('area', 'Surface'),
        ];
    }
}
