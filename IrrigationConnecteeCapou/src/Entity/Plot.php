<?php

namespace App\Entity;

use App\Repository\PlotRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
 
#[ORM\Entity(repositoryClass: PlotRepository::class)]
class Plot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $name;
    
    #[ORM\Column(type: 'float')]
    private $area;
    
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $color;
    
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'plots')]
    private $user;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $filepath;

    #[ORM\OneToMany(mappedBy: 'plotId', targetEntity: Card::class)]
    private $cards;
    
    public function __construct()
    {
        $this->user = new ArrayCollection();
        $this->cards = new ArrayCollection();
    }
        
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getName(): ?string
    {
        return $this->name;
    }
    
    public function setName(string $name): self
    {
        $this->name = $name;
        
        return $this;
    }
    
    public function getArea(): ?float
    {
        return $this->area;
    }
    
    public function setArea(float $area): self
    {
        $this->area = $area;
        
        return $this;
    }
    
    public function getColor(): ?string
    {
        return $this->color;
    }
    
    public function setColor(string $color): self
    {
        $this->color = $color;
        
        return $this;
    }
    
    /**
     * @return Collection<int, User>
     */
    public function getUser(): Collection
    {
        return $this->user;
    }
    
    public function addUser(User $user): self
    {
        if (!$this->user->contains($user)) {
            $this->user[] = $user;
        }
        
        return $this;
    }
    
    public function removeUser(User $user): self
    {
        $this->user->removeElement($user);
        
        return $this;
    }
    
    public function getFilepath(): ?string
    {
        return $this->filepath;
    }
    
    public function setFilepath(string $filepath): self
    {
        $this->filepath = $filepath;
        
        return $this;
    }

    /**
     * @return Collection<int, Card>
     */
    public function getCards(): Collection
    {
        return $this->cards;
    }

    public function addCard(Card $card): self
    {
        if (!$this->cards->contains($card)) {
            $this->cards[] = $card;
            $card->setPlotId($this);
        }

        return $this;
    }

    public function removeCard(Card $card): self
    {
        if ($this->cards->removeElement($card)) {
            // set the owning side to null (unless already changed)
            if ($card->getPlotId() === $this) {
                $card->setPlotId(null);
            }
        }

        return $this;
    }
}