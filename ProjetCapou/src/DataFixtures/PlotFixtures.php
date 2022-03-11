<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Plot;
use Faker;

class PlotFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');
        
        for($parcelle = 1; $parcelle <= 10 ; $parcelle++){
            $plot = new Plot();
            $plot->setName($faker->name);
            $plot->setFilePath($faker->mimeType());
            $plot->setArea($faker->randomFloat());
            $plot->setColor($faker->rgbColor);
            
            $manager->persist($plot);
        }
        

        $manager->flush();
    }
}
