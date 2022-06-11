<?php

namespace App\Entity;

use App\Repository\MeasureRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MeasureRepository::class)]
class Measure
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $date;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $time;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $gps;
    
    #[ORM\Column(type: 'integer')]
    private $value;
    
    #[ORM\ManyToOne(targetEntity: MeasureType::class, inversedBy: 'measures')]
    #[ORM\JoinColumn(nullable: false)]
    private $measureType;

    #[ORM\ManyToOne(targetEntity: Card::class, inversedBy: 'measures')]
    private $card;
    
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getDate(): ?string
    {
        return $this->date;
    }
    
    public function setDate(string $date): self
    {
        $this->date = $date;
        
        return $this;
    }
    
    public function getTime(): ?string
    {
        return $this->time;
    }
    
    public function setTime(string $time): self
    {
        $this->time = $time;
        
        return $this;
    }
    
    public function getGps(): ?string
    {
        return $this->gps;
    }
    
    public function setGps(string $gps): self
    {
        $this->gps = $gps;
        
        return $this;
    }
    
    public function getValue(): ?int
    {
        return $this->value;
    }
    
    public function setValue(int $value): self
    {
        $this->value = $value;
        
        return $this;
    }
    
    public function getMeasureType(): ?MeasureType
    {
        return $this->measureType;
    }
    
    public function setMeasureType(?MeasureType $measureType): self
    {
        $this->measureType = $measureType;
        
        return $this;
    }

    public function getCardId(): ?Card
    {
        return $this->card;
    }

    public function setCardId(?Card $card): self
    {
        $this->card = $card;

        return $this;
    }
}