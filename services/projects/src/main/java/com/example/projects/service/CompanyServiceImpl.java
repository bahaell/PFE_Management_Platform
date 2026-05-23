package com.example.projects.service;

import com.example.projects.entity.Company;
import com.example.projects.entity.CompanyStatus;
import com.example.projects.exception.NotFoundException;
import com.example.projects.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company getCompanyById(UUID id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Company not found with id: " + id));
    }

    @Override
    @Transactional
    public Company createCompany(Company company) {
        if (company.getStatus() == null) {
            company.setStatus(CompanyStatus.PENDING);
        }
        return companyRepository.save(company);
    }

    @Override
    @Transactional
    public Company updateCompany(UUID id, Company companyDetails) {
        Company company = getCompanyById(id);
        company.setName(companyDetails.getName());
        company.setDescription(companyDetails.getDescription());
        company.setEmail(companyDetails.getEmail());
        company.setPhone(companyDetails.getPhone());
        company.setCountry(companyDetails.getCountry());
        company.setCity(companyDetails.getCity());
        return companyRepository.save(company);
    }

    @Override
    @Transactional
    public void deleteCompany(UUID id) {
        Company company = getCompanyById(id);
        companyRepository.delete(company);
    }

    @Override
    @Transactional
    public Company approveCompany(UUID id) {
        Company company = getCompanyById(id);
        company.setStatus(CompanyStatus.APPROVED);
        return companyRepository.save(company);
    }

    @Override
    @Transactional
    public Company blacklistCompany(UUID id, String reason) {
        Company company = getCompanyById(id);
        company.setStatus(CompanyStatus.BLACKLISTED);
        company.setBlacklistReason(reason);
        return companyRepository.save(company);
    }
}
