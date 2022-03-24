<?php

namespace App\Entity;

use App\Repository\CardRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CardRepository::class)]
class Card
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;
    
    #[ORM\Column(type: 'integer')]
    private $lora;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $date;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $location;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $function;
    
    #[ORM\ManyToOne(targetEntity: State::class, inversedBy: 'cards')]
    #[ORM\JoinColumn(nullable: false)]
    private $state;
    
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getLora(): ?int
    {
        return $this->lora;
    }
    
    public function setLora(int $lora): self
    {
        $this->lora = $lora;
        
        return $this;
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
    
    public function getLocation(): ?string
    {
        return $this->location;
    }
    
    public function setLocation(string $location): self
    {
        $this->location = $location;
        
        return $this;
    }
    
    public function getFunction(): ?string
    {
        return $this->function;
    }
    
    public function setFunction(string $function): self
    {
        $this->function = $function;
        
        return $this;
    }
    
    public function getState(): ?State
    {
        return $this->state;
    }
    
    public function setState(?State $state): self
    {
        $this->state = $state;
        
        return $this;
    }
}