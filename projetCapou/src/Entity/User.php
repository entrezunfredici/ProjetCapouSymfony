<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;
    
    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $email;
    
    #[ORM\Column(type: 'json')]
    private $roles = [];
    
    #[ORM\Column(type: 'string')]
    private $password;
    
    /**
     * @var string
     */
    private $plainPassword;    
    
    #[ORM\Column(type: 'string', length: 255)]
    private $lastName;
    
    #[ORM\Column(type: 'string', length: 255)]
    private $firstName;
    
    #[ORM\ManyToMany(targetEntity: Valve::class, mappedBy: 'user')]
    private $valves;
    
    #[ORM\ManyToMany(targetEntity: Plot::class, mappedBy: 'user')]
    private $plots;

    #[ORM\Column(type: 'string', length: 20)]
    private $phone_number;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $address;

    #[ORM\Column(type: 'string', length: 5, nullable: true)]
    private $zipcode;

    #[ORM\Column(type: 'string', length: 150, nullable: true)]
    private $city;
    
    public function __construct()
    {
        $this->valves = new ArrayCollection();
        $this->plots = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->lastName.' '.$this->firstName;
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getEmail(): ?string
    {
        return $this->email;
    }
    
    public function setEmail(string $email): self
    {
        $this->email = $email;
        
        return $this;
    }
    
    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }
    
    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_TECHNICIAN';
        
        return array_unique($roles);
    }
    
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        
        return $this;
    }
    
    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }
    
    public function setPassword(string $password): self
    {
        $this->password = $password;
        
        return $this;
    }
    
    /**
     * @return string
     */
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }
    
    /**
     * @param string $plainPassword
     * @return User
     */
    public function setPlainPassword(string $plainPassword): User
    {
        $this->plainPassword = $plainPassword;
        return $this;
    }
        
    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
    
    public function getLastName(): ?string
    {
        return $this->lastName;
    }
    
    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;
        
        return $this;
    }
    
    public function getFirstName(): ?string
    {
        return $this->firstName;
    }
    
    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;
        
        return $this;
    }

    /**
     * @return Collection<int, Valve>
     */
    public function getValves(): Collection
    {
        return $this->valves;
    }
    
    public function addValve(Valve $valve): self
    {
        if (!$this->valves->contains($valve)) {
            $this->valves[] = $valve;
            $valve->addUser($this);
        }
        
        return $this;
    }
    
    public function removeValve(Valve $valve): self
    {
        if ($this->valves->removeElement($valve)) {
            $valve->removeUser($this);
        }
        
        return $this;
    }
    
    /**
     * @return Collection<int, Plot>
     */
    public function getPlots(): Collection
    {
        return $this->plots;
    }
    
    public function addPlot(Plot $plot): self
    {
        if (!$this->plots->contains($plot)) {
            $this->plots[] = $plot;
            $plot->addUser($this);
        }
        
        return $this;
    }
    
    public function removePlot(Plot $plot): self
    {
        if ($this->plots->removeElement($plot)) {
            $plot->removeUser($this);
        }
        
        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(string $phone_number): self
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(?string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }
    
}