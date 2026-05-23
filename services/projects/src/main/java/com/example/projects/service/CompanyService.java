package com.example.projects.service;

import com.example.projects.entity.Company;
import java.util.List;
import java.util.UUID;

public interface CompanyService {
    List<Company> getAllCompanies();

    Company getCompanyById(UUID id);

    Company createCompany(Company company);

    Company updateCompany(UUID id, Company companyDetails);

    void deleteCompany(UUID id);

    Company approveCompany(UUID id);

    Company blacklistCompany(UUID id, String reason);
}
