<?php

namespace App\Entity;

use App\Repository\CardRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\DateTime;

#[ORM\Entity(repositoryClass: CardRepository::class)]
class Card
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;
    
    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private $lora;
    
    #[ORM\Column(type: 'datetime', length: 255)]
    private $date;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $location;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $function;
    
    #[ORM\ManyToOne(targetEntity: State::class, inversedBy: 'cards')]
    #[ORM\JoinColumn(nullable: false)]
    private $state;

    #[ORM\ManyToOne(targetEntity: Plot::class, inversedBy: 'cards')]
    private $plot;

    #[ORM\OneToMany(mappedBy: 'card', targetEntity: Measure::class)]
    private $measures;

    public function __construct()
    {
        $this->measuresId = new ArrayCollection();
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getLora(): ?string
    {
        return $this->lora;
    }
    
    public function setLora(string $lora): self
    {
        $this->lora = $lora;
        
        return $this;
    }
    
    public function getDate()
    {
        return $this->date;
    }
    
    public function setDate($date): self
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

    public function getPlotId(): ?Plot
    {
        return $this->plot;
    }

    public function setPlotId(?Plot $plot): self
    {
        $this->plot = $plot;

        return $this;
    }

    /**
     * @return Collection<int, Measure>
     */
    public function getMeasuresId(): Collection
    {
        return $this->measures;
    }

    public function addMeasuresId(Measure $measures): self
    {
        if (!$this->measures->contains($measures)) {
            $this->measures[] = $measures;
            $measures->setCardId($this);
        }

        return $this;
    }

    public function removeMeasuresId(Measure $measures): self
    {
        if ($this->measures->removeElement($measures)) {
            // set the owning side to null (unless already changed)
            if ($measures->getCardId() === $this) {
                $measures->setCardId(null);
            }
        }

        return $this;
    }
}