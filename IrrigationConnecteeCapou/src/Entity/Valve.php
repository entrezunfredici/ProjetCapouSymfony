<?php

namespace App\Entity;

use App\Repository\ValveRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ValveRepository::class)]
class Valve
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;
    
    #[ORM\Column(type: 'boolean')]
    private $state;
    
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'valves')]
    private $user;
    
    public function __construct()
    {
        $this->user = new ArrayCollection();
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getState(): ?bool
    {
        return $this->state;
    }
    
    public function setState(bool $state): self
    {
        $this->state = $state;
        
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
}