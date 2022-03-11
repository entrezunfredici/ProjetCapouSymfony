<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Measure;
use App\Entity\MeasureType;
use Faker;

class MeasureFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        
        $faker = Faker\Factory::create('fr_FR');
        
        for($mesure = 1 ; $mesure <= 10 ;$mesure++){
            
            $measureType = new MeasureType();
//             $type = array ("int","string");
//             $randomType = array_rand($type);
//             $measureType->setType($randomType);
            $measureType->setType($faker->text(5));
            $manager->persist($measureType);
            
            $measure = new Measure();
            $measure->setDate($faker->date);
            $measure->setTime($faker->time);
            $measure->setGps($faker->longitude.$faker->latitude);
            $measure->setValue($faker->randomDigit());
            $measure->setMeasureType($measureType);
            $manager->persist($measure);
        }
        
        $manager->flush();
    }
}
