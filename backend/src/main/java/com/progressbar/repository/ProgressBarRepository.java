package com.progressbar.repository;

import com.progressbar.model.ProgressBar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressBarRepository extends JpaRepository<ProgressBar, String> {
}
